import { useState } from 'react';
import ScaleLoader from "react-spinners/BarLoader";



export default function Home() {


  const [x2, setX2] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  // let isLoading = false;
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("HandleClick",isLoading)
    fetchData();
  };


  const fetchData = async() => {
    const rawResponse = await fetch('https://e2de-34-105-31-72.ngrok.io/predict', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"content":x2})
        });
    const blob = await rawResponse.blob();
    const url = URL.createObjectURL(blob);
    setIsLoading(false);
    console.log(isLoading)
    setImageUrl(url);
}

  const downloadImg = async()=>{
    let alink = document.createElement('a');
    alink.href = imageUrl;
    alink.download = 'genImg.jpg';
    alink.click();
  }


  //

  return (
    <>
    {/* <div className="page-border"> */}
      <div className="bg--white justify-center">

        <header className="align--center pt3 pb2 ">
            <div className="container">
                <h1 className="mb3 reveal-on-scroll is-revealing" title="Huddle">TextImage</h1>
                <h2 className="mb3 reveal-on-scroll is-revealing">Use your imagination and create the text</h2>
                {isLoading && <div className='align--center mb3 container mx3'><ScaleLoader className="loadStyle"color="#2AFADF" /></div>}
               
                {/* <h3 className='mb3'>Loading...</h3> */}
                <input
                    type="text"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                />
                <div>
                <button className="button-9" onClick={(event)=>handleClick(event)}>See</button>
                </div>
            </div>
        </header>
      <main>
        <div className="container align--center">
          <section className="pt2 pb3">  
          {imageUrl? <><img src={imageUrl} className="mb" alt="Generated Image" /><div><button className="button-9" onClick={downloadImg}>Download</button></div></>
          :<img className="mb3" src="./presentor.jpg" alt="Huddle presentation" />}                  
                  
                    
                      
          </section>
        </div>
        </main>
      </div>
    {/* </div> */}
    </>
  );
}