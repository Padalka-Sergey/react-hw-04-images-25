import { useState } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [searchData, setSearchData] = useState(null);
  const [page, setPage] = useState(1);

  const formSubmitHandler = data => {
    setSearchData(data);
  };

  return (
    <AppContainer>
      <Searchbar submitHandler={formSubmitHandler} startPage={setPage} />
      <ImageGallery searchData={searchData} page={page} newPage={setPage} />
    </AppContainer>
  );
};

// export class App extends Component {
//   state = {
//     searchData: null,
//   };

//   formSubmitHandler = data => {
//     this.setState({ searchData: data });
//   };

//   render() {
//     return (
//       <AppContainer>
//         <Searchbar submitHandler={this.formSubmitHandler} />
//         <ImageGallery searchData={this.state.searchData} />
//       </AppContainer>
//     );
//   }
// }
