import moment from 'moment/moment';

const FooterComponent = () => {
  return (
    <footer
      style={{ background: "#303031", color: "#87898A" }}
      className="z-10 py-6 px-4 md:px-12 text-center"
    >
      Develop & Design Jaspreet © Copyright {moment().format("YYYY")}
    </footer>
  )
}

export default FooterComponent;