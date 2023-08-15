import React from 'react'
import {Row, Col, Container } from 'react-bootstrap'


const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
        <Container>
          <Row>
            <Col className='text-center py-34'>
              <p>KShop &copy; {currentYear}</p>
            </Col>
          </Row>
        </Container>

        
    </footer>
  )
}

export default Footer;