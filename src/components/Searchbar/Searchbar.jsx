import { SearchbarBox, Form, BtnForm, InputForm } from './Searchbar.styled';

export const Searchbar = ({ submitHandler }) => {
  const onSubmitHandler = e => {
    const { input } = e.target.elements;
    e.preventDefault();
    const text = input.value.toLowerCase();
    submitHandler(text);
    input.value = '';
  };

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
