function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  //const accountNumber = generateAccountNumber();

  // Handle the account creation, e.g., fetch updated data
  const handleAccountCreated = async () => {
    console.log('Account created!');

    // Fetch updated data
    try {
      const response = await fetch('/account/all');
      const updatedData = await response.json();
      console.log('Updated Data:', updatedData);
      // Update the state or re-render the component with the new data
    } catch (error) {
      console.error('Error fetching updated data:', error);
    }
  };

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      width="300px"
      status={status}
      body={show ?
        <CreateForm setShow={setShow} onAccountCreated={handleAccountCreated} /> :
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  // removed context and subbed this fnc
  // connect to BE
  function handle(){
    console.log(name,email,password);  // sending these params to BE

    // API call to create acct
    fetch(`/account/create/${name}/${email}/${password}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);  // write to console what we get back from server 
        props.setShow(false); // update UI to show a new user was created
        props.onAccountCreated(); // callback to inform that a new acct was created
      })
      .catch(error => {
        console.error('Error creating account:', error);
        // Handle the error as needed
      });
  }

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}