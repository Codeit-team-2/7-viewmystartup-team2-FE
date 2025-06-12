import ModalCompanyListItem from "./ModalCompanyListItem";

function ModalCompanyList({ name }) {
  const recentCount = 3;

  return (
    <div>
      <p>
        {name} ({recentCount})
      </p>
      <ModalCompanyListItem />
    </div>
  );
}

export default ModalCompanyList;
