import { useState } from 'react';
import { GalleryItem, ImgGalleryItem } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onModalHandler,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // onModalHandler(true);
    onModalHandler(isModalOpen);
  };

  const closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      // if (e.target.nodeName !== 'IMG' || e.code === 'Escape') {

      setIsModalOpen(false);
      // onModalHandler(false);
      onModalHandler(isModalOpen);
    }
  };

  return (
    <>
      <GalleryItem>
        <ImgGalleryItem src={webformatURL} alt={tags} onClick={openModal} />
      </GalleryItem>
      {isModalOpen === true && (
        <Modal
          onPressEsc={closeModal}
          tags={tags}
          largeImageURL={largeImageURL}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

// export class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   openModal = () => {
//     this.setState({ isModalOpen: true });
//     this.props.onModalHandler(true);
//   };

//   closeModal = e => {
//     if (e.target === e.currentTarget || e.code === 'Escape') {
//       // if (e.target.nodeName !== 'IMG' || e.code === 'Escape') {
//       this.setState({ isModalOpen: false });
//       this.props.onModalHandler(false);
//     }
//   };

//   render() {
//     const { isModalOpen } = this.state;
//     const { webformatURL, tags, largeImageURL } = this.props;

//     return (
//       <>
//         <GalleryItem>
//           <ImgGalleryItem
//             src={webformatURL}
//             alt={tags}
//             onClick={this.openModal}
//           />
//         </GalleryItem>
//         {isModalOpen === true && (
//           <Modal
//             onPressEsc={this.closeModal}
//             tags={tags}
//             largeImageURL={largeImageURL}
//             closeModal={this.closeModal}
//           />
//         )}
//       </>
//     );
//   }
// }
