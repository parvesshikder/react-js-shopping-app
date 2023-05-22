import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { getAuth } from "firebase/auth";

import { v4 as uuidv4 } from "uuid";
import "./AddProduct.css";

function AddProduct() {
  const user = getAuth().currentUser;
  const id = uuidv4(); // generate unique id
  const userEmail = user.email; // get user email from authentication
  const firestore = getFirestore();
  const db = collection(firestore, "products");
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => { 
    //
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            await addDoc(db, {
              id,
              name,
              price,
              description,
              image: downloadURL,
              sellerName,
              sellerAddress,
              sellerPhone,
              userEmail,
              status : "unsold",
              date: new Date().toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }),
              buyerName: "none",
            });
            console.log("Product added to Firestore!");
            // reset the form fields
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setSellerName("");
            setSellerAddress("");
            setSellerPhone("");
          } catch (error) {
            console.error("Error adding product to Firestore: ", error);
          }
        });
      }
    );
  };

  return (
    <div className="App">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="8" className="mx-auto">
            <form className="add-product-form" onSubmit={formHandler}>
              <br />
              <input type="file" className="fileinput" />
              <br />
              <MDBInput
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <MDBInput
                label="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <br />
              <MDBInput
                type="textarea"
                label="Product Description"
                maxLength={6000}
                style={{
                  height: '100px',
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <br />

              <MDBInput
                label="Seller Name"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required
              />
              <br />
              <MDBInput
                type="textarea"
                label="Seller Address"
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
                required
              />
              <br />
              <MDBInput
                label="Seller Phone"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                required
              />
              <br />
              <MDBBtn color="primary" type="submit" >
                Add Product
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />
      <h2 className="text-center">Uploading done {progress}%</h2>
    </div>
  );
}

export default AddProduct;
