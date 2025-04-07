# Sudoku

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Overview

A straightforward Sudoku, perfect for beginners and experts.

## Features

- Various way to move on the board
- Undo
- Pick from different themes
- Timer (can be hidden)
- Mistake counter (can be hidden)
- Optional visual helpers (conflicts, row, collumn, box, identical number highlights)
- Candidate and auto-candidates mode
- Kanji mode

## Technologies Used

- Next.js
- TailwindCSS

## Installation

1. Clone the repository:

   ```
   git clone
   ```

2. Navigate to the project directory:

```
   cd sudoku
```

3. Install dependencies:

```
   yarn
```

4. Start the development server:

```
    yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the web app.

## Usage

Move around with `wasd`, `arrow keys`, or `hjkl`.
Insert number by pressing a number key or add candidate with `shift+<number>`
Remove number by pressing the `Delete` or `Backspace` key
Undo last action by pressing `ctrl+z` or `u`
