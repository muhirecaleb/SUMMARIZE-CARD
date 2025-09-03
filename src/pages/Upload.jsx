import { useEffect, useState } from "react";
import UploadImg from "../assets/upload.png";
import { processFile } from "../data/data";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { StorageContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Upload = () => {
  const { setStorage } = useContext(StorageContext);
    const navigate = useNavigate();

const [file , setFile] = useState(null);
const [errorMessage,setErrorMessage] = useState(false)
const [isLoading, setisLoading] = useState(false)

function updateFile(e) {
if(e.target && e.target.files.length > 0) {
const selectedFile = e.target.files[0]
setFile(selectedFile)
console.log(selectedFile);
}

else {
  return
}
}

useEffect(() => {
  if(!file) return
  
  const allowedTypes = [
    "application/pdf",
    "text/plain",     
    "text/csv",        
    "text/html",    
    "application/msword"  
 
  ];

  if (!allowedTypes.includes(file.type)) {
    return;
  }

  processFile(file,setErrorMessage,setisLoading,setStorage,navigate)

},[file])

useEffect(() => {
  if (errorMessage) {
    toast.error('Something went wrong. Please try again.');
  }
}, [errorMessage]);

  return (
    <div className="h-screen flex flex-col justify-center items-center p-5 ">
      {
        !isLoading ? (
        <div className="flex flex-col items-center gap-6 w-96 h-auto p-6 text-center rounded-lg shadow-xl bg-gradient-to-t from-[#0f0f0f] to-[#2e2e2e] border border-gray-700">
  <h3 className="text-3xl font-extrabold text-white mt-2">Let AI Do the Reading</h3>

  <p className="text-gray-300 text-sm leading-relaxed px-2">
    Upload your file and watch the magic happen. Our AI will quickly turn documents into clear, structured summaries — saving you time and brainpower.
  </p>

  <div className="w-full flex flex-col items-center cursor-pointer border-2 border-dashed border-gray-500 bg-gradient-to-t from-[#1a1a1a] to-[#333333] rounded-md p-5 hover:border-blue-400 transition-all duration-300">
    <label
      htmlFor="file-upload"
      className="flex flex-col items-center w-full cursor-pointer"
    >
      <img className="w-16 mb-4 opacity-80" src={UploadImg} alt="upload" />
      <span className="text-white font-medium">Click to Upload File</span>
      <input
        type="file"
        id="file-upload"
        accept=".pdf, .txt, .csv, .html"
        className="hidden"
        onChange={updateFile}
      />
    </label>
  </div>
</div>

       ) : <Spinner />

      }
      
    </div>
  );
};

export default Upload;
