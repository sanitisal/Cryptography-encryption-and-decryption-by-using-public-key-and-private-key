import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />
        <link href="/assets/css/main.css" rel="stylesheet" />
      </Helmet>

      <div className="index-page">
        <header id="header" className="header d-flex align-items-center sticky-top">
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <Link to="/home" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">File Share</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
              <ul>
                <li><Link to="/home" className="active">Home</Link></li>
                <li><a href="/home#about">About</a></li>
                <li><a href="/home#featured-services">Services</a></li>
                <li><Link to="/signup">Signup</Link></li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            {/* Link to Login Page */}
            <Link to="/login" className="btn-getstarted">Login</Link>
          </div>
        </header>
      </div>

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-up">
                <h1>Elegant and Creative Solutions for Data Security</h1>
                <p>
                  We ensure your sensitive data remains safe through encryption and decryption techniques. Our team specializes in protecting your information from unauthorized access.
                </p>
                <div className="d-flex">
                  <Link to="#about" className="btn-get-started">Learn More</Link>
                  <a href="https://www.youtube.com/watch?v=ur9lwk04YMk" className="glightbox btn-watch-video d-flex align-items-center">
                    <i className="bi bi-play-circle"></i><span>Watch Video</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay="100">
                <img src="assets/img/hero-img.png" className="img-fluid animated" alt="Hero" />
              </div>
            </div>
          </div>
        </section> {/* End Hero Section */}

        {/* Featured Services Section */}
        <section id="featured-services" className="featured-services section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-activity icon"></i></div>
                  <h4><a href="#" className="stretched-link">Data Encryption</a></h4>
                  <p>
                    We implement advanced encryption algorithms to protect your files from unauthorized access. Your data will be securely encoded before storage or transfer.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-bounding-box-circles icon"></i></div>
                  <h4><a href="#" className="stretched-link">Decryption Services</a></h4>
                  <p>
                    Our decryption service ensures that only authorized parties can decode your encrypted data, ensuring its confidentiality and integrity.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-calendar4-week icon"></i></div>
                  <h4><a href="#" className="stretched-link">Secure File Sharing</a></h4>
                  <p>
                    Share your files with confidence knowing they are securely encrypted during the entire transmission process, providing peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> {/* End Featured Services Section */}

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container section-title" data-aos="fade-up">
            <span>About Us</span>
            <h2>About</h2>
            <p>We specialize in providing cutting-edge encryption and decryption solutions to safeguard your data.</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <img src="assets/img/about.png" className="img-fluid" alt="About" />
                <a href="https://www.youtube.com/watch?v=ur9lwk04YMk" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Advanced Encryption Techniques to Protect Your Data</h3>
                <p className="fst-italic">
                  Our encryption methods ensure that only authorized individuals can access your sensitive information, keeping hackers at bay.
                </p>
                <ul>
                  <li><i className="bi bi-check2-all"></i> Strong encryption protocols to protect your files.</li>
                  <li><i className="bi bi-check2-all"></i> Efficient decryption for authorized access.</li>
                  <li><i className="bi bi-check2-all"></i> Real-time protection during file transfer.</li>
                </ul>
                <p>
                  At File Share, we ensure that your personal and professional data remains encrypted and secure, safeguarding it from any potential cyber threats.
                </p>
              </div>
            </div>
          </div>
        </section> {/* End About Section */}
      </main>

      <footer id="footer" className="footer">
        {/* Footer Top Section */}
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/home" className="d-flex align-items-center">
                <span className="sitename">File Share App</span>
              </Link>
              <div className="footer-contact pt-3">
                <p>Shivaji Nagar</p>
                <p>Pune, India</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+91 80125 11111</span></p>
                <p><strong>Email:</strong> <span>info@example.com</span></p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Web Design</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Web Development</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Product Management</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <h4>Follow Us</h4>
              <p>Stay connected and get the latest updates, news, and tips on data security and technology trends. Follow us on our social media channels!</p>
              <div className="social-links d-flex">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div> 
        
        {/* Footer Copyright */}
        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">File Share App</strong> <span>All Rights Reserved</span></p>
        </div>

        {/* Scroll Top Button */}
        <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short"></i>
        </a>
      </footer>

      <Helmet>
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/vendor/aos/aos.js"></script>
        <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="/assets/vendor/purecounter/purecounter_vanilla.js"></script>
        <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
        <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
        <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="/assets/js/main.js"></script>
      </Helmet>
    </div>
  );
}

export default Home;
