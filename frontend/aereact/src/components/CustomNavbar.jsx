import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth/authIndex';
// import ProfileInfo from '../pages/user_routes/ProfileInfo';
// import userContext from '../context/userContext';





const CustomNavbar = (args) => {

    // auto navigation
    let navigate = useNavigate();


    // const userContextData = useContext(userContext);

    // navbar toggler constants
    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    // handle login and then subsequently setting up the user in the local browser storage 
    // update login state, and the user who's logged in, whenever the value of login changes, update the component immediately
    useEffect(() => {

        setLogin(isLoggedIn());
        setUser(getCurrentUserDetail());

    }, [login])



    // handle logout
    // setLogin to false, and delete user details from the localStorage
    const logout = () => {
        doLogout(() => {
            // logged out
            setLogin(false);
            // userContextData.setUser({
            //     data: null,
            //     // this login: false is unnecessary, as above setLogin(false) has already set login to false
            //     login: false
            // });
            // navigate("");
            // navigate("/");
            navigate("/login");
        })
    }



    
    const toggle = () => setIsOpen(!isOpen);

    const logoStyles = {
        fontFamily: 'Algerian', // Set the desired font family
        fontWeight: 'bold',   // Make the text bold
        fontSize: '32px',     // Adjust the font size as needed
        color: '#80A5FF',     // Set a custom text color
        // Add any additional styles you want here
    };

    return (
        <div>
            <Navbar {...args}
                color='dark'
                dark
                expand='md'
                fixed=''
                className='px-4'
            >
                <NavbarBrand tag={ReactLink} to='/' ><span style={logoStyles}>AE PHP</span></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {/* <Nav className="me-auto" navbar> */}
                    <Nav navbar className="me-auto" >

                        <NavItem>
                            <NavLink tag={ReactLink} to='/' >New!!!</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={ReactLink} to='/about' >About</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={ReactLink} to='/services' >Services</NavLink>
                        </NavItem>





                        <NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    More
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem tag={ReactLink} to='/services'>Services</DropdownItem>
                                    <DropdownItem>Contact Us</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>


                        <NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Socials
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem href='https://www.linkedin.com/in/abhishek1141781/'>LinkedIn</DropdownItem>
                                    <DropdownItem href='https://github.com/abhishek1141781/'>GitHub</DropdownItem>
                                    <DropdownItem href='https://www.instagram.com/abhishek1141781/'>Instagram</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href='https://linktr.ee/abhishek1141781'>Linktree</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                    </Nav>

                    <Nav navbar>

                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.user_id}`}>
                                            {/* If ProfileInfo used here a recursive loop is created and frontend keeps on rendering infinitely, so only app.js renders ProfileInfo based on the url routing */}
                                            {/* <ProfileInfo /> */}
                                            ProfileInfo
                                        </NavLink>
                                    </NavItem>


                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard">
                                            {user.email}
                                        </NavLink>
                                    </NavItem>

                                    {/* <Button color="danger" onClick={() => logout()}>Logout</Button>{' '} */}
                                    <NavItem>
                                        <NavLink onClick={logout}>
                                            <Button color="danger" onClick={logout}>
                                            Logout
                                            </Button>
                                        </NavLink>
                                    </NavItem>

                                </>
                            )
                        }
                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to='/login' >
                                            Login
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={ReactLink} to='/signup' >
                                            Signup
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }


                    </Nav>

                    <NavbarText>AWS EC2 Instance</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;