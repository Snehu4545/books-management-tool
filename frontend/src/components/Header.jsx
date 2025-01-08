import React from "react";
import { CContainer, CHeader, CHeaderNav, CHeaderBrand, CNavItem, CNavLink, CButton, CImage, CHeaderText } from '@coreui/react';
import BookLogo from '../img/book.jpeg'

const Header = () => {
    return (
        <CHeader>
            <CContainer fluid>
                <CHeaderBrand href="/" style={{ fontWeight: 'bold', fontSize: 16 }}><CImage src={BookLogo} alt="home" height={70} width={160} style={{ borderRadius: 10 }} /></CHeaderBrand>
                <CHeaderText href="/" style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#4e73df',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'skew(-10deg)',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '2px',
                    transition: 'transform 0.3s ease',
                    fontStyle: 'normal'
                }}>Book Management</CHeaderText>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="/" active>
                            Book List
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>

            </CContainer>
        </CHeader>
    )
};

export default Header;