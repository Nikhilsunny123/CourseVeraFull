const PWDRequisite = ({
    capsLetterFlag,
    numberFlag,
    pwdLengthFlag,
    specialCharFlag,
  }) => {
    return (
      <div className="message">
        <p style={{color:"red"}} className={capsLetterFlag}>Must contain 1 Capital Letter</p>
        <p style={{color:"red"}} className={numberFlag}>Must contain number</p>
        <p style={{color:"red"}} className={pwdLengthFlag}>Must be 8 Chars long</p>
        <p style={{color:"red"}} className={specialCharFlag}> Must contain special character</p>
      </div>
    );
  };
  
  export default PWDRequisite;