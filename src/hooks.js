import { useEffect, useState } from "react";
import axios from "axios";

function useFlip(initialVal = true) {
  const [value, setValue] = useState(initialVal);
  const flip = () => {
    setValue((oldValue) => !oldValue);
  };

  return [value, flip];
}

const useAxios = (url, LSkey) => {
  //   const [responses, setResponses] = useState([]);
  const [responses, setResponses] = useLocalStorage(LSkey);

  const addResponse = async (formatFunc, path = "") => {
    const response = await axios.get(`${url}${path}`);
    setResponses((prevRes) => [...prevRes, formatFunc(response.data)]);
  };
  const clearResponses = () => {
    setResponses([]);
  };
  return [responses, addResponse, clearResponses];
};

const useLocalStorage = (key, defaultVal = []) => {
  const [state, setState] = useState(() => {
    let lsVal = localStorage.getItem(key);
    return lsVal ? JSON.parse(lsVal) : defaultVal;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export { useFlip, useAxios };
