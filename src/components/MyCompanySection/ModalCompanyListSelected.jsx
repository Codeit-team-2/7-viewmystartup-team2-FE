import { useCompareCompany } from "../CompareCompanySection/CompareCompanyContext";
import ModalCompanyListItem from "./ModalCompanyListItem";

function ModalCompanyListSelected({ type }) {
  const modalCompanies = useCompareCompany();

  return (
    <div>
      <p>{`선택한 기업 (${modalCompanies.length})`}</p>
      <ul className="companyList">
        {modalCompanies.map((company) => (
          <ModalCompanyListItem
            key={company.id}
            company={company}
            type={type}
          />
        ))}
      </ul>
    </div>
  );
}

export default ModalCompanyListSelected;
