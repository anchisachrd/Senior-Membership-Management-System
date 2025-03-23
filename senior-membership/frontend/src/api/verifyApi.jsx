import axios from "axios";

export const verifyUser = async () => {

    try {
        const response = await fetch('http://localhost:3000/api/auth/verify', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status === 403) {
            throw new Error("No token received (403)");
          }

        const data = await response.json();
        // ส่งข้อมูลของ userInfo ไปจ้า
        return data.user;

    } catch (error) {
        console.error('Fetch Protected Data Error:', error);
        throw error
    }

};




