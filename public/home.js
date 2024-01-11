function Home(){
  return (
    <Card
      txtcolor="black"
      header="First Central Bank"
      headerClassName="CardHeader"
      width="325px"
      title="Welcome to First Central Bank"
      text-align= "center"
      text="For all your banking needs. (Not really since there is no security in this bank!)"
      body={(<img src="moneyplant.jpg" className="img-fluid" alt="Responsive image"/>)}
      
    />
  );
}
