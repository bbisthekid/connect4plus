import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/styles/button";
import Field from "../../../components/field";
import { useAuth } from "../../../contexts/AuthContext";
import useUpdateProfile from "../../../hooks/use-update-profile";

const Content = ({ user }) => {
    const { userId } = useParams();
    const { isUpdating, updateProfile } = useUpdateProfile(userId);
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState(user.displayName);

    const isCurrentUser = useMemo(() => currentUser?.uid === userId, [
        currentUser,
        userId,
    ]);

    useEffect(() => {
        setDisplayName(user.displayName);
    }, [user]);

    function handleUpdate() {
        if (isCurrentUser) updateProfile(displayName);
    }

    return (
        <>
            {isCurrentUser && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px",
                    }}
                >
                    <p>
                        <b>Connect Four Rating:</b> {Math.floor(user.c4Rating)}
                    </p>
                </div>
            )}
            {isCurrentUser && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px",
                    }}
                >
                    <p>
                        <b>Tic Tac Toe Rating:</b> {Math.floor(user.tttRating)}
                    </p>
                </div>
            )}
            <Field
                disabled={!isCurrentUser}
                id="display-name"
                label="Display Name"
                onChange={setDisplayName}
                placeholder="Enter Display Name"
                value={displayName}
            />
            {isCurrentUser && (
                <Button disabled={isUpdating} onClick={handleUpdate}>
                    Updat{isUpdating ? "ing" : "e"}
                </Button>
            )}
        </>
    );
};

export default Content;
