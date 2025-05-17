import { useState } from 'react';
import { SearchbarBox, Form, BtnForm, InputForm } from './Searchbar.styled';

export const Searchbar = ({ submitHandler, startPage }) => {
  const [alertStatus, setAlertStatus] = useState('');
  const [inputText, setInputText] = useState('');

  const onSubmitHandler = e => {
    const { input } = e.target.elements;
    e.preventDefault();
    const text = input.value.toLowerCase();
    setInputText(text);
    if (text.trim() === '') {
      setAlertStatus('alert');
      return;
    }
    submitHandler(text);
    input.value = '';
    startPage(1);
  };

  if (alertStatus === 'alert' && inputText.trim() === '') {
    alert('Введите запрос!');
  }

  return (
    <SearchbarBox>
      <Form onSubmit={onSubmitHandler}>
        <BtnForm type="submit" />
        <InputForm
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarBox>
  );
};

// export class Searchbar extends Component {
//   onSubmitHandler = e => {
//     const { input } = e.target.elements;
//     e.preventDefault();
//     const text = input.value.toLowerCase();
//     this.props.submitHandler(text);
//     input.value = '';
//   };

//   render() {
//     return (
//       <SearchbarBox>
//         <Form onSubmit={this.onSubmitHandler}>
//           <BtnForm type="submit" />
//           <InputForm
//             type="text"
//             name="input"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </Form>
//       </SearchbarBox>
//     );
//   }
// }
