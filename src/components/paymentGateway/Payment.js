import "./Payment.css";
import { useFormik } from "formik";
import { card } from "./PaymentValidation";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../Header";
import axios from "axios";

const initialValues = {
  name: "",
  card: "",
  expiry: "",
  cvv: "",
  radiobuttons:"Credit"
  
};
function Payment() {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: card,
      onSubmit: (values, action) => {
        // values.preventDefault();
        
        const token = localStorage.getItem("Token");

        const headers = {
          Authorization: token,
        };

        const data = {
          name: values.name,
          card: values.card,
          expiry: values.expiry,
          cvv: values.cvv,
          source: values.radiobuttons,
        };

        axios
          .post(
            process.env.REACT_APP_BACKEND_SERVER + "/payment/transaction",
            data,
            {
              headers: headers,
            }
          )
          .then((response) => {
            const output = response.data;
            
            if (output.responseStatus) {
              navigate("/checkout/success");
            }
          })
          .catch((response) => {
            console.log("Response" + response);
          });
        
      },
    });
  // console.log("errors", errors);

  let title = "Payment";
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  return (
    <div className="pg">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>

      <Header />
      <h1 style={{ fontWeight: "bold" }}>Payment Gateway</h1>
      <div className="form-layout">
        <form onSubmit={handleSubmit} sx={{ display: "flex", gap: 2 }}>
          <div className="mode">
            <input
              type="radio"
              checked={values.radiobuttons === "Credit"}
              onChange={handleChange}
              value="Credit"
              name="radiobuttons"
              id="option-1"
            />
            <input
              type="radio"
              checked={values.radiobuttons === "Debit"}
              onChange={handleChange}
              value="Debit"
              name="radiobuttons"
              id="option-2"
            />
            <input
              type="radio"
              checked={values.radiobuttons === "Wallet"}
              onChange={handleChange}
              value="Wallet"
              name="radiobuttons"
              id="option-3"
            />
            <label htmlFor="option-1" className="option option-1">
              <div className="dot"></div>
              <span>Credit</span>
            </label>

            <label htmlFor="option-2" className="option option-2">
              <div className="dot"></div>
              <span>Debit</span>
            </label>

            <label htmlFor="option-3" className="option option-3">
              <div className="dot"></div>
              <span>Wallet</span>
            </label>
          </div>

          {values.radiobuttons === "Credit" && (
            <div className="form">
              <div>
                <input
                  type="text"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  id="formfield"
                  value={values.name}
                  onBlur={handleBlur}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter name on card"
                  required
                />
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="number"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  name="card"
                  value={values.card}
                  onBlur={handleBlur}
                  placeholder="Enter credit card number"
                  onChange={handleChange}
                  required
                />
                {errors.card && touched.card ? (
                  <p className="form-error">{errors.card}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="text"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  id="formfield"
                  value={values.expiry}
                  onBlur={handleBlur}
                  name="expiry"
                  placeholder="Expiry MMYY"
                  onChange={handleChange}
                  
                  required
                />
                {errors.expiry && touched.expiry ? (
                  <p className="form-error">{errors.expiry}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="number"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  placeholder="CVV"
                  value={values.cvv}
                  onBlur={handleBlur}
                  name="cvv"
                  onChange={handleChange}
                  required
                />
                {errors.cvv && touched.cvv ? (
                  <p className="form-error">{errors.cvv}</p>
                ) : null}
              </div>
              <Button
                aria-label="Submit"
                sx={{
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: selectedColor,
                  },
                }}
                type="submit"
                variant="contained"
              >
                Pay
              </Button>
            </div>
          )}

          {values.radiobuttons === "Debit" && (
            <div className="form">
              <div>
                <input
                  type="text"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  id="formfield"
                  value={values.name}
                  onBlur={handleBlur}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter name on card"
                  required
                />
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="number"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  name="card"
                  value={values.card}
                  onBlur={handleBlur}
                  placeholder="Enter credit card number"
                  onChange={handleChange}
                  required
                />
                {errors.card && touched.card ? (
                  <p className="form-error">{errors.card}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="text"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  id="formfield"
                  value={values.expiry}
                  onBlur={handleBlur}
                  name="expiry"
                  placeholder="Expiry MMYY"
                  onChange={handleChange}
                  
                  required
                />
                {errors.expiry && touched.expiry ? (
                  <p className="form-error">{errors.expiry}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="number"
                  style={{ width: 500, padding: 12, margin: 8 }}
                  placeholder="CVV"
                  value={values.cvv}
                  onBlur={handleBlur}
                  name="cvv"
                  onChange={handleChange}
                  required
                />
                {errors.cvv && touched.cvv ? (
                  <p className="form-error">{errors.cvv}</p>
                ) : null}
              </div>
              <Button
                aria-label="Submit"
                sx={{
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: selectedColor,
                  },
                }}
                type="submit"
                variant="contained"
                onClick={() => navigate("success")}
              >
                Pay
              </Button>
            </div>
          )}

          {values.radiobuttons === "Wallet" && (
            <div className="form">
              <h3>Shobhit Arora</h3>
              <h3>Available Balance: $20</h3>
              <input
                type="number"
                style={{ width: 500, padding: 12, margin: 8 }}
                placeholder="Top Up Amount"
                required
              />
              <br></br>
              <Button
                aria-label="Submit"
                sx={{
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: selectedColor,
                  },
                }}
                type="submit"
                variant="contained"
                onClick={() => navigate("success")}
              >
                Pay
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Payment;
