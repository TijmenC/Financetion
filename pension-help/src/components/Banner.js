import { React, useState } from "react";
import { Navbar, Button, Nav} from "react-bootstrap";
import Sidebar from "react-sidebar";
import Menu from "../images/menu.png";
import Close from "../images/close.png";
import User from "../images/user.png";
import "../styling/navbar.css";

function Banner() {
  const [showinstall, setShowInstall] = useState(false);
  const [installprompt, setInstallPrompt] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault(); //Prevent the event (this prevents the default bar to show up)
    setInstallPrompt(event); //Install event is stored for triggering it later
    //...do something here to show your install button
    setShowInstall(true);
  });
  const InstallPromt = () => {
    //Recognize the install variable from before?
    installprompt.prompt();
    setShowInstall(false);
    installprompt.userChoice.then((choiceResult) => {
      setShowInstall(false);
      if (choiceResult.outcome !== "accepted") {
        //..If it was not accepted to install than show the install button again
        setShowInstall(true);
      }
      setInstallPrompt(null);
    });
  };
  const ShowInstallButton = () => (
    <Button id="installbutton" variant="outline-succes" onClick={InstallPromt}>
      Install
    </Button>
  );
  const ShowSideBar = () => (
    <Sidebar
      sidebar={
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <Button
              onClick={() => setSidebarOpen(false)}
              className="btn bg-transparent"
            >
              <img src={Close} width="30" height="30" alt="menu" />
            </Button>
            <Button
              href={"/MyAccount"}
              className="btn bg-transparent"
              variant="light"
            >
              <img src={User} width="60" height="60" alt="user" />
              <p>Peter Janssen</p>
            </Button>
            <a
              href="/MyAccount"
              className="list-group-item list-group-item-action bg-light"
            >
              My account
            </a>
            <a href="/" className="list-group-item list-group-item-action bg-light">
              Home
            </a>
            <a
              href="/YourSavings"
              className="list-group-item list-group-item-action bg-light"
            >
              Your savings
            </a>
            <a
              href="/MySpendings"
              className="list-group-item list-group-item-action bg-light"
            >
              My spendings
            </a>
            <a
              href="/Tips"
              className="list-group-item list-group-item-action bg-light"
            >
              Tips
            </a>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
      styles={{ sidebar: { background: "white" } }}
    ></Sidebar>
  );

  return (
    <>
      <Navbar className="color-nav" expand="lg">
        <Button
          onClick={() => setSidebarOpen(true)}
          className="btn bg-transparent"
        >
          <img src={Menu} width="30" height="30" alt="menu" />
        </Button>
        <Nav className="m-auto">
       <Nav.Link href="/"><b><h4>Financetion</h4></b></Nav.Link>
    </Nav>
        {showinstall ? <ShowInstallButton /> : null}
      </Navbar>
      {sidebarOpen ? <ShowSideBar /> : null}
    </>
  );
}
export default Banner;
