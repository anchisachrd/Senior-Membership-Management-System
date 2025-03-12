

export const verifyUser = async () => {

    try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:3000/api/login/verify', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        // ส่งข้อมูลของ userInfo ไปจ้า
        return data.user.userInfo;

    } catch (error) {
        console.error('Fetch Protected Data Error:', error);
        throw error
    }

};


