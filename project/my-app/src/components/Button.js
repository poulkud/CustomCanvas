import React from 'react';


const Button = props => {
    return (
        <div style={styles.buttonContainer}>
            {(props.link)
                ? (
                    <a href={props.href} download={props.download} style={styles.defaultStyle}>{props.children}</a>
                ) : (
                    <button onClick={() => props.onClick()} style={styles.defaultStyle}> {props.children}</button>
                )
            }
        </div>
    )
}

const styles = {
    buttonContainer: {
        width: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        margin: '0 6px',
        cursor: 'pointer',
    },
    defaultStyle: {
        fontSize: '12px',
        height: '100%',
        width: '100%',
        outline: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        background: 'rgb(218, 53, 10)',
        color: 'white',
        padding: '10px 0',
        borderRadius: '6px',
        border: 0,
        cursor: 'pointer',
    },
};

export default Button;