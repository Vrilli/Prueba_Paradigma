import { Route, Routes, Navigate } from "react-router-dom";
import Lista from "../component/Lista";
import { Preguntas } from "../component/Preguntas";


export const Dasboard = () => {



    return (
        <div>
            
            <Routes>
                <Route path="/preguntas" element={<Preguntas />} />
                <Route path="/lista" element={<Lista />} />
                <Route path="*" element={<Navigate to="/preguntas" />} />
            </Routes>
        </div>
    )
}