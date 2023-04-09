import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

function EditModal(){

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.user?.id);

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.user?.profileImage)
    setCoverImage(currentUser?.user?.coverImage)
    setName(currentUser?.user?.name)
    setUsername(currentUser?.user?.username)
    setBio(currentUser?.user?.bio)
  }, [currentUser?.user?.name, currentUser?.user?.username, currentUser?.user?.bio, currentUser?.user?.profileImage, currentUser?.user?.coverImage]);
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    
    try {
      
      setIsLoading(true);

      
      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();

    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload 
        value={profileImage} 
        disabled={isLoading} 
        onChange={(image) => setProfileImage(image)} label="Upload profile image"
      />
      <ImageUpload 
        value={coverImage} 
        disabled={isLoading} 
        onChange={(image) => setCoverImage(image)} label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading} 
      />
      <Input 
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading} 
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;