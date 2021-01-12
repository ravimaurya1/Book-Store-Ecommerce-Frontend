import React,{useEffect} from "react";
import Menu from "./Menu";
import "../style.css";
import img from "./book2.png";

 
import 'react-chat-widget/lib/styles.css';

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {

  return (
    <div>
      <Menu />
      <div
        className="jumbotron"
        style={{
          backgroundColor: "skyblue",
          height: "150px",
          marginTop: "0px",
          marginBottom: "10px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop:"0px",
          }}
        >
          <div>
            <h2 style={{}}>{title}</h2>
            <p className="lead" style={{}}>
              {description}
            </p>
          </div>
          <div>
            <img src={img} alt="no image" style={{ height: "160px" }} />
          </div>
        </div>
      </div>
      <div className={className}>{children}</div>
      <footer
        className="site-footer"
        style={{ fontFamily: "'Poppins', sans-serif", height: "300px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                Bookstore.com <i>Buying Book to Be Simple </i> is a Site to buy the
                programming book. Ebook.com provide seamless way to buy book. We
                delivered Programming book All over the world.
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <a href="http://scanfcode.com/category/c-language/">C</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/front-end-development/">
                    UI Design
                  </a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/back-end-development/">
                    PHP
                  </a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/java-programming-language/">
                    Java
                  </a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/android/">Android</a>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a href="http://scanfcode.com/about/">About Us</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/contact/">Contact Us</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/privacy-policy/">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="http://scanfcode.com/sitemap/">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2020 All Rights Reserved by
                <a href="#">BookStore</a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
