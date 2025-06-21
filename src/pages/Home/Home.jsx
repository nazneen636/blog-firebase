import React from "react";
import BlogCard from "../../Component/Home/BlogCard";
import Modal from 'react-modal';
import CreatePost from "../../Component/Home/CreatePost";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Home = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="text-theme bg-theme h-screen py-10 flex items-center flex-col">
      <button className="bg-blue-600 py-3 px-5 text-white w-[80%]  rounded-lg mb-10" onClick={openModal}>Create Post</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CreatePost/>
      </Modal>

      <BlogCard />
    </div>
  );
};

export default Home;
