import React, { useEffect, useState } from 'react';
import styles from './QwixxGrid.module.css';

const QwixxGrid = () => {
    const colors = ['red', 'yellow', 'green', 'blue'];
    const [selectedNumbers, setSelectedNumbers] = useState({ red: [], yellow: [], green: [], blue: [] });
    const [crosses, setCrosses] = useState({ red: false, yellow: false, green: false, blue: false });

    const handleClick = (color, number) => {
        if (crosses[color]) {
            return;
        }

        setSelectedNumbers(prevSelectedNumbers => {
            const numbers = prevSelectedNumbers[color];
            if (numbers.includes(number)) {
                return { ...prevSelectedNumbers, [color]: numbers.filter(n => n !== number) };
            }
            if (numbers.length > 0 && numbers[numbers.length - 1] >= number) {
                return prevSelectedNumbers;
            }
            return { ...prevSelectedNumbers, [color]: [...numbers, number] };
        });
    };

    const handleCrossClick = color => {
        const numbers = selectedNumbers[color];
        setCrosses(prevCrosses => ({ ...prevCrosses, [color]: !prevCrosses[color] }))
        if (numbers.length > 5 && !numbers.includes(0)) {
            setSelectedNumbers(prevSelectedNumbers => {
                return {...prevSelectedNumbers, [color]: [...numbers, 0]}
            })
        }
    };

    useEffect(() => {
        console.log('use crosses', crosses)
        Object.entries(crosses).forEach(cross => {
            if (selectedNumbers[cross[0]].includes(0)) {
                setSelectedNumbers({ ...selectedNumbers, [cross[0]]: selectedNumbers[cross[0]].filter(number => number !== 0)})
            }
        })
    }, [crosses])

    const sumTo = (number) => {
        let sum = 0;
        for (let i = 1; i <= number; i++) {
            sum += i;
        }
        return sum;
    }

    const calculateScore = () => {
        let score = 0;
        Object.entries(selectedNumbers).forEach(([color, numbers]) => {
            score += sumTo(numbers.length);
        });
        return score;
    };

    return (
        <>
            <table className={styles.qwixxGrid}>
                <tbody>
                    {colors.map(color => (
                        <tr key={color}>
                            <td className={`${styles.table} ${styles.header} ${styles[color]}`}>{color}</td>
                            {Array(11).fill().map((_, index) => {
                                const number = index + 2;
                                return (
                                    <td key={index} className={`${styles.number} ${styles[color]} ${selectedNumbers[color].includes(number) ? `${styles.selected}` : ''}`} onClick={() => handleClick(color, number)}>
                                        {number}
                                    </td>
                                );
                            })}
                            <td className={`${styles.number} ${styles.cross} ${styles[color]} ${crosses[color] ? `${styles.selected}` : ''}`} onClick={() => handleCrossClick(color)}>
                                X
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.score}>
                Score: {calculateScore()}
            </div>
        </>
    );
};

export default QwixxGrid;
