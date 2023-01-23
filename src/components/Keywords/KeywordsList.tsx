import * as React from 'react';
import Alert from 'react-bootstrap/Alert';


export default function KeywordsList({relatedWords}: { relatedWords: string[] }) {
    return (
        relatedWords ? (
            <div>
                <h1>KeywordsList</h1>
                <ul>
                    {relatedWords.map((word) => (
                        <li key={word}>{word}</li>
                    ))}
                </ul>
            </div>
        ) : (
            <Alert variant="warning">
                No related words found
            </Alert>
        )
    );
}