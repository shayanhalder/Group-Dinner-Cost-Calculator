import ArrowBulletStyles from "./ArrowBullet.module.css";
import { useState } from "react";

interface ArrowBulletProps {
  name: string;
}

export default function ArrowBullet({ name }: ArrowBulletProps) {
  const [toggle, setToggled] = useState<boolean>(false);

  return (
    <li onClick={() => setToggled(!toggle)} className={ArrowBulletStyles.listItem}>
      <span className={`${ArrowBulletStyles.arrow} ${toggle ? ArrowBulletStyles.rotated : ""}`}>&gt;</span>{" "}
      {name}
    </li>
  );
}
