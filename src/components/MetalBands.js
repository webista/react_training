import React, { useContext, useState } from "react";
import Page from "./Page";
import Tile from "./Tile";
import CustomSelect from "./CustomSelect";
import MusicContext from "../contexts/MusicContext";
import ModalContext from "../contexts/ModalContext";
import TEXTS from "../Texts";
import useComponentLog from "../hooks/useComponentLog";

function MetalBands() {
  useComponentLog("MetalBands");

  const music = useContext(MusicContext);
  const metalStyles = [];
  const [bands, setBands] = useState([]);
  const { setModal, setModalMessage } = useContext(ModalContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.querySelector("select").value) {
      const selectedOptionId = e.target.querySelector("select").value;
      setBands(music[selectedOptionId].bands);
    } else {
      setModal(true);
      setModalMessage(TEXTS.custom_select_nothing_selected);
    }
  }

  function getMetalStyles(music) {
    music.map((item) => metalStyles.push(item.style));
    return metalStyles;
  }

  return (
    <Page title="Metal bands">
      <h2>Metal bands</h2>
      <p>My favorite bands rendering with custom select box</p>
      <form className="Form mt20" onSubmit={handleSubmit}>
        <div className="Form-rowFlex">
          <label className="Form-label mr10 xs-mb10">Music style</label>
          <CustomSelect data={getMetalStyles(music)} />
          <button className="Button Button--primary ml10 mr10 xs-mt10" type="submit">
            Show some bands
          </button>
        </div>
      </form>
      <ul className="Tiles mt30">
        {bands.map((band, index) => (
          <Tile key={index} heading={band} style={{ animationDelay: index / 10 + "s" }} />
        ))}
      </ul>
    </Page>
  );
}

export default MetalBands;
