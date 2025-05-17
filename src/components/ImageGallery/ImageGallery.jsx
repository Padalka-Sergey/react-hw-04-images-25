import { useState, useEffect, useRef } from 'react';
import { fetchReq } from 'services/fetch-api';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({ searchData, page, newPage }) => {
  const gallery = useRef();
  const respDataRef = useRef([]);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchData === null || page !== 1) {
      return;
    }
    // if (searchData.trim() === '') {
    //   setStatus('idleAlert');
    //   return;
    // }
    setStatus('pending');

    fetchReq(searchData, 1)
      .then(response => {
        respDataRef.current = response.data.hits;
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchData]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus('pendingBtn');
    fetchReq(searchData, page)
      .then(response => {
        const responseAll = [...respDataRef.current, ...response.data.hits];
        const responseFilter = responseAll.filter(
          (item, idx, arr) =>
            idx === arr.findIndex(arrEl => arrEl.id === item.id)
        );
        respDataRef.current = responseFilter;
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchData]);

  const nextPageHandler = () => {
    newPage(page => page + 1);
  };

  const makeLowScroll = () => {
    if (page === 1 || onModalHandler) {
      return;
    }
    const linkGallery = gallery.current;
    const { height } = linkGallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  };

  const onModalHandler = data => {
    return data;
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved' && respDataRef.current.length === 0) {
    return (
      <h1
        style={{
          margin: '20px auto',
        }}
      >
        Картинки с именем {searchData} нет! :(
      </h1>
    );
  }

  // if (status === 'idleAlert' && searchData.trim() === '') {
  //   return alert('Введите запрос!');
  // }

  if (status === 'rejected') {
    return (
      <h1
        style={{
          margin: '20px auto',
        }}
      >
        {error.message}
      </h1>
    );
  }

  return (
    (status === 'resolved' || status === 'pendingBtn') && (
      <>
        <GalleryList ref={gallery} onLoad={makeLowScroll}>
          {respDataRef.current.map(({ id, ...otherProps }) => (
            <ImageGalleryItem
              key={id}
              {...otherProps}
              onModalHandler={onModalHandler}
              // webformatURL={webformatURL}
              // tags={tags}
              // largeImageURL={largeImageURL}
            />
          ))}
        </GalleryList>
        {respDataRef.current.length > 0 && status !== 'pendingBtn' && (
          <Button nextPageHandler={nextPageHandler} />
        )}
        {status === 'pendingBtn' && <Loader />}
      </>
    )
  );
};

// export class ImageGallery extends Component {
//   gallery = React.createRef();

//   state = {
//     responseData: [],
//     page: 1,
//     status: 'idle',
//     error: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const { searchData } = this.props;

//     if (prevProps.searchData !== searchData) {
//       if (searchData.trim() === '') {
//         this.setState({ status: 'idleAlert' });
//         return;
//       }
//       this.setState({ page: 1, status: 'pending' });
//       try {
//         const response = await fetchReq(searchData, 1);
//         this.setState({
//           responseData: response.data.hits,
//           status: 'resolved',
//         });
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }

//     if (prevState.page !== page) {
//       if (page === 1) {
//         return;
//       }
//       this.setState({ status: 'pendingBtn' });
//       try {
//         const response = await fetchReq(searchData, page);
//         const responseAll = [...prevState.responseData, ...response.data.hits];

//         const responseFilter = responseAll.filter(
//           (item, idx, arr) =>
//             idx === arr.findIndex(arrEl => arrEl.id === item.id)
//         );

//         this.setState({
//           responseData: responseFilter,
//           status: 'resolved',
//         });
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }
//   }

//   nextPageHandler = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   makeLowScroll = () => {
//     const { page } = this.state;
//     if (page === 1 || this.onModalHandler) {
//       return;
//     }
//     const linkGallery = this.gallery.current;
//     const { height } = linkGallery.firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: height * 2,
//       behavior: 'smooth',
//     });
//   };

//   onModalHandler = data => {
//     return data;
//   };

//   render() {
//     const { responseData, status, error } = this.state;

//     if (status === 'pending') {
//       return <Loader />;
//     }

//     if (status === 'resolved' && responseData.length === 0) {
//       return (
//         <h1
//           style={{
//             margin: '20px auto',
//           }}
//         >
//           Картинки с именем {this.props.searchData} нет! :(
//         </h1>
//       );
//     }

//     if (status === 'idleAlert' && this.props.searchData.trim() === '') {
//       return alert('Введите запрос!');
//     }

//     if (status === 'rejected') {
//       return (
//         <h1
//           style={{
//             margin: '20px auto',
//           }}
//         >
//           {error.message}
//         </h1>
//       );
//     }

//     return (
//       (status === 'resolved' || status === 'pendingBtn') && (
//         <>
//           <GalleryList ref={this.gallery} onLoad={this.makeLowScroll}>
//             {/* <GalleryList ref={this.gallery}> */}
//             {responseData.map(({ id, ...otherProps }) => (
//               <ImageGalleryItem
//                 key={id}
//                 {...otherProps}
//                 onModalHandler={this.onModalHandler}
//                 // webformatURL={webformatURL}
//                 // tags={tags}
//                 // largeImageURL={largeImageURL}
//               />
//             ))}
//           </GalleryList>

//           {responseData.length > 0 && status !== 'pendingBtn' && (
//             <Button nextPageHandler={this.nextPageHandler} />
//           )}
//           {status === 'pendingBtn' && <Loader />}
//         </>
//       )
//     );
//   }
// }
