import { createContext } from "react";

const music = [
  {
    style: "Folk metal",
    bands: ["Equilibrium", "Ensiferum", "Skálmöld"]
  },
  {
    style: "Glam metal",
    bands: ["Bon Jovi", "Mötley Crüe", "Skid Row"]
  },
  {
    style: "Gothic metal",
    bands: ["Cradle of Filth", "Leaves' Eyes", "Nachtblut"]
  },
  {
    style: "Heavy metal",
    bands: ["Black Sabbath", "Burning Witches", "Dio", "Iron Maiden", "Judas Priest", "Manowar", "Queensrÿche", "Savatage", "Twisted Sister"]
  },
  {
    style: "Industrial metal",
    bands: ["Eisbrecher", "Pain", "Rammstein", "Raubtier"]
  },
  {
    style: "Melodic death metal",
    bands: ["Aephanemer", "Amon Amarth", "Debauchery", "Children of Bodom", "Die Apokalyptischen Reiter"]
  },
  {
    style: "Power metal",
    bands: ["Accept", "Battle Beast", "Bloodbound", "Dark Moor", "Helloween", "Heavatar", "Heavenly", "Hulkoff", "Lost Horizon", "Sabaton", "Stormwarrior", "Stratovarius"]
  },
  {
    style: "Progressive metal",
    bands: ["Amorphis", "Crimson Glory", "Dyscordia"]
  },
  {
    style: "Trash metal",
    bands: ["Iced Earth", "Kreator", "Machine Head", "Metallica", "Slayer"]
  }
];

const MusicContext = createContext(music);

export default MusicContext;
