import { useEffect } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export const Modal = ({ onPressEsc, largeImageURL, tags, closeModal }) => {
  useEffect(() => {
    document.addEventListener('keydown', onPressEsc);

    return () => {
      document.removeEventListener('keydown', onPressEsc);
    };
  }, [onPressEsc]);

  return (
    <Overlay onClick={closeModal}>
      <ModalEl>
        <img src={largeImageURL} alt={tags} />
      </ModalEl>
    </Overlay>
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.props.onPressEsc);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.props.onPressEsc);
//   }

//   render() {
//     const { largeImageURL, tags, closeModal } = this.props;
//     return (
//       <Overlay onClick={closeModal}>
//         <ModalEl>
//           <img src={largeImageURL} alt={tags} />
//         </ModalEl>
//       </Overlay>
//     );
//   }
// }
