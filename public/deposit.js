function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="success"
      txtcolor="white"
      header="Deposit"
      width="300px"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (
    <>
    <h5>Success</h5>
    <button type="button" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');  // ensures that any previous error or status msg related to the deposit process is cleared when the user chooses to deposit again
      }}>
        Deposit again
    </button>
    </>
  );
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  // removed context and subbed this fnc
  // connect to BE
  function handle(){
    console.log(email,amount);  // sending these params to BE
    
    // Check if email and amount are not empty
    if (!email || !amount) {
      props.setStatus('Error: Email and amount cannot be empty');
      return;
    }

    // Check if the amount is a valid number
    if (isNaN(amount)) {
      props.setStatus('Error: Amount must be a valid number');
      setTimeout(() => props.setStatus(''), 3000);
      return false;
    }

    // Prevent depositing a negative number
    if (parseFloat(amount) <= 0) {
      props.setStatus('Error: Amount must be a positive number');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }

    // API call to deposit
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            //props.setStatus(JSON.stringify(data.value));
            props.setStatus(`New Balance: $${data.value.balance.toFixed(2)}`);
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
      })
      .catch(error => {
          props.setStatus('Error during deposit');
          console.log('error:', error);
      });

    return true; // If none of the above conditions are met, the validation is successful & this statement signals success
  }

  function clearForm(){
    setEmail('');
    setAmount('');
    //setShow(true);
    props.setShow(true);
  };

  return(
    <>
      Email<br/>
      <input 
        type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <br />
        
      Amount<br/>
      <input 
        type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}
      />
      <br />

      <button type="button" className="btn btn-light" onClick={handle}>Deposit</button>
    </>
  );
}
