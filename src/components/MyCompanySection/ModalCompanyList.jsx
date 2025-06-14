import ModalCompanyListItem from "./ModalCompanyListItem";

function ModalCompanyList({ name, companies }) {
  const recentCount = 3;

  return (
    <div>
      <p>
        {name} ({recentCount})
      </p>
      <ul className="companyList">
        {companies.map((company) => (
          <ModalCompanyListItem key={company.id} company={company} />
        ))}
      </ul>
    </div>
  );
}

export default ModalCompanyList;
