# Task Manager

Egy webapp, az applikáció egy személyes Task-Manager alkalmazás lenne. Elsősorban az egyetemi feladatokat lehetne benne számontartani és kezelni. A felhasználó hozzáadhatja egyetemének adatait és szemesztereihez tárgyait, amelyekhez később hozzárendelhetők a Taskok. Emellett a tárgyakhoz megadhatók egyéb részletek is (például jegyszerzés feltételei és ponthatárai). Így az app képes várható jegy és a féléves átlagok kiszámítására is. Ezeken kívül a tárolt adatokból más, a felhasználó számára hasznos statisztikák is megjeleníthetők.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) ![Bootstrap](https://img.shields.io/badge/-Typescript-05122A?style=flat&logo=Typescript&color=72b9ab) ![Bootstrap](https://img.shields.io/badge/-React-05122A?style=flat&logo=React&color=72b9ab) ![Bootstrap](https://img.shields.io/badge/-Tailwind-05122A?style=flat&logo=Tailwind&color=72b9ab) ![Bootstrap](https://img.shields.io/badge/-Vite-05122A?style=flat&logo=Vite&color=72b9ab) ![Bootstrap](https://img.shields.io/badge/-Visual%20Studio%20Code-05122A?style=flat&logo=Visual-Studio-Code&color=72b9ab)

## Installation

A projekt root mappájában futtassuk le az alább commadot. Ez telepíteni fogja a megfelelő backend és frontend függőségeket.

```bash
npm run setup
```

Majd a program futtatásához az aábbi  parancsot kell meg adni:

```bash
npm run dev
```

És végül az alábbi linken lesz elérhető az alkalmazás:

```http
http://localhost:5173/
```

## Features

1. Autentikáció
2. Profil szerkesztés
3. Egyetemek, Félévek, és Tárgyak hozzáadása/szerkesztése/törlése
4. Egyetemek, Félévek, és Tárgyak megjelenítése a hozzájuk tartozó adatokkal
5. Taskok hozzáadása/szerkesztése/törlése
6. Taskok megjelenítése havi bontásban, akár egyetemre, félévre vagy tárgyra szűkítve
7. Taskok megjelenítése különféle formátumban, állapotától vagy fajtájától függően
8. Jegyek, átlagok folyamatos kiszámítása
9. Jegy kalkulátor - a meg adott pontok és jegyszerzési határok alapján kiszámolja a jegyet
10. Féléves eredmény becslése a lezárt és aktuális jegyek alapján
11. Aggregált statisztikák megjelenítése a féléves vagy akár teljes egyetemi teljesítményéről

## Tech Stack

**Frontend:** React, TailwindCSS, DaisyUI

**Backend:** Laravel REST API

## License

[MIT](https://choosealicense.com/licenses/mit/)
