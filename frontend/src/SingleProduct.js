import styled from "styled-components";
import { useParams } from "react-router-dom";
//import { useEffect } from "react";
import { useProductContext } from "./context/ProductContext";
import { Container } from "./styles/Container";
import PageNavigation from "./components/PageNavigation";
import Star from "./components/Star";
import FormatPrice from "./Helpers/FormatPrice";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import AddToCart from "./components/AddToCart";

const SingleProduct = () => {
  const { products:singleProduct} = useProductContext();
 // console.log(singleProduct,"product");

  const { id } = useParams();
    // console.log(id);

   const detail = singleProduct.find((curElement) => {
    //console.log(curElement, "element");
         return curElement._id === id;
        });
      //console.log(detail,"sa");
  
 

  return (
    <Wrapper>
        <>
        <PageNavigation title={detail.name} />
          <Container className="container">
            <div className="grid grid-two-column">
              {/* image section */}
              <div className="product-images">
                <img
                  src={detail.cover}
                  alt={detail.name}
                />
              </div>
              {/* book detail */}
              <div className="product-data">
                <h2>{detail.name}</h2>
                <h2>
                  <strong>Author</strong>- {detail.author}
                </h2>
                <Star stars={detail.rating} />
                <p className="product-data-price">
                  MRP:
                  <del>
                    <FormatPrice
                      price={detail.price + 100000}
                    />
                  </del>
                </p>
                <p className="product-data-price product-data-real-price">
                  Deal of the Day:{" "}
                  <FormatPrice price={detail.price} />
                </p>
                <div className="product-data-warranty">
                  <div className="product-warranty-data">
                    <TbTruckDelivery className="warranty-icon" />
                    <p>Free Delivery</p>
                  </div>

                  <div className="product-warranty-data">
                    <TbReplace className="warranty-icon" />
                    <p>30 Days Replacement</p>
                  </div>
                  <div className="product-warranty-data">
                    <MdSecurity className="warranty-icon" />
                    <p>2 Year Warranty </p>
                  </div>
                </div>

                <AddToCart product={detail}  />
              </div>
            </div>
          </Container>
        </>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-images img {
    width: 55%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
