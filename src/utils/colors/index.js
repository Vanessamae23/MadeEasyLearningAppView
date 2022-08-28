const mainColors = {
    grey1: "#CAD4E0",
    dark1: "#112340",
    blue1: "#5E7FA4",
    blue2: "#a2c4c9",
    blue3: "#0b5394",
    blue4: "#d0e0e3",
    grey2: "#7D8797",
    grey3: "#808080",
    black1: "#00000",
    black2: 'rgba(0, 0, 0, 0.5)',
    red1: "#E06379",
    green1: "#93C572"
}

export const colors = {
    primary: mainColors.blue1,
    secondary: mainColors.dark1,
    card: mainColors.blue2,
    white: "white",
    black: "black",
    success: mainColors.green1,
    card: mainColors.blue4,
    text: {
        primary: "black",
        secondary: mainColors.grey2,
        inactive: mainColors.grey3,
        active: "white"
    },
    button: {
        primary: {
            background: mainColors.blue1,
            text: "white"
        },
        secondary: {
            background: "white",
            text: "black"
        },
        disable: {
            background: mainColors.grey1,
            text: mainColors.grey2
        }
    },
    input: {
        primary: {
            background: mainColors.grey1
        },
        secondary: {
            background: mainColors.blue3,
            text: "white"
        }
    },
    loadingBackground: mainColors.black2,
    error: mainColors.red1
    
}