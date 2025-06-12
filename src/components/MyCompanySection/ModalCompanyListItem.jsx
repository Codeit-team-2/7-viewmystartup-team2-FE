function ModalCompanyListItem({ company }) {
  return (
    <div>
      <img >{company.icon}</img>
      <p>{company.name}</p>
      <p>{company.name2}</p>
      <Button></Button>
    </div>
  );
}

export default ModalCompanyListItem;
