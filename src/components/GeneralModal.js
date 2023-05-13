import React, { useState } from "react"


const GeneralModal = ({
    title,
    content,
    buttonText,
    button2Text = "",
    buttonOnClick,
    button2_OnClick = () => { },
   
}) => {

    
    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 100,
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>


            <div
                style={{
                    width: "30%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    padding: "20px"
                }}>


                <h1 className="text-center">{title}</h1>
                <p className="text-center">{content}</p>
                
                <div className="d-flex justify-content-center">
                    {
                        button2Text !== "" && (
                            <button className="btn btn-primary" onClick={button2_OnClick}>{button2Text}</button>
                        )
                    }
                    <button className="btn btn-danger mx-2" onClick={buttonOnClick}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

export default GeneralModal