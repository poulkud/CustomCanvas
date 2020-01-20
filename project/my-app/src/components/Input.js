import React from 'react';

const Input = props => {

    // const [file, setFile] = useState('');
    // function readInpit(event) {
    //     let file = event.target.files[0];
    //     let reader = new FileReader();
    //     reader.onload = function(event) {
    //         setFile(event.target.result);
    //     }
    //     reader.readAsText(file);
    // };

    return (
        <>
            <input
                placeholder='input'
                type={props.type}
                onChange={(event) => props.onChange(event)}
            />
       </> 
    )
}

export default Input;