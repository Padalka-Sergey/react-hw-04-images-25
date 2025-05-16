import React, { Component } from 'react';
import { GalleryItem, ImgGalleryItem } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    this.props.onModalHandler(true);
  };

  closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      // if (e.target.nodeName !== 'IMG' || e.code === 'Escape') {
      this.setState({ isModalOpen: false });
      this.props.onModalHandler(false);
    }
  };

  render() {
    const { isModalOpen } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props;

    return (
      <>
        <GalleryItem>
          <ImgGalleryItem
            // style={{
            //   width: '100%',
            //   height: 260,
            // }}
            src={webformatURL}
            alt={tags}
            onClick={this.openModal}
          />
        </GalleryItem>
        {isModalOpen === true && (
          <Modal
            onPressEsc={this.closeModal}
            tags={tags}
            largeImageURL={largeImageURL}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
