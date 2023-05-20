import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contact = () => {
  const [userData, setUserData] = useState({});

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datas = await res.json();
      //console.log(datas);
      setUserData(datas);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);



  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Us</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.1698137160133!2d75.80596111496988!3d26.898105283133965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db41f78970ac5%3A0xe9eef625b7f871c!2sRambagh%20Palace%20-%20Jaipur!5e0!3m2!1sen!2sin!4v1677917569143!5m2!1sen!2sin"
        width="100%"
        height="420"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="google map"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="container">
        <div className="contact-form">
          <form className="contact-inputs">
            <input
              type="text"
              value={userData.name}
              placeholder="Enter Your Name"
              name="username"
              required
              autoComplete="off"
            />
            <input
              type="email"
              value={userData.email}
              placeholder="Enter Your Email"
              name="Email"
              required
              autoComplete="off"
            />
            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter Your Message"
            >
            </textarea>
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
