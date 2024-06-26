import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

const StepOtp = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const { email, phone, hash } = useSelector((state) => state.auth.otp);
    async function submit(e) {
        e.preventDefault()
        if (!otp || !(email || phone) || !hash) return;
        try {
            const { data } = await verifyOtp({ otp, hash, email, phone });
            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className={styles.cardWrapper}>
                <form onSubmit={submit}>
                    <Card
                        title="Enter the code we just texted you"
                        icon="lock-emoji"
                    >
                            <TextInput
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <div className={styles.actionButtonWrap}>
                                <Button text="Next" />
                            </div>
                            <p className={styles.bottomParagraph}>
                                By entering your number, you’re agreeing to our Terms of
                                Service and Privacy Policy. Thanks!
                            </p>
                    </Card>
                </form>
            </div>
        </>
    );
};

export default StepOtp;
