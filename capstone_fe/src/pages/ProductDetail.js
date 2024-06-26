import "../css/ProductDetail.css";
import Button from '../component/Button';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Purchase from "./Purchase";

export default function ProductDetail({ fileId, closeModal }) {

    const [isAdmin, setIsAdmin] = useState(false); //관리자 여부
    const [reviewText, setReviewText] = useState("");
    const [satisfaction, setSatisfaction] = useState(""); // 만족도 
    const [reviews, setReviews] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();
    const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
    const { id } = useParams();
    console.log('detail File ID:', fileId);
    const [editedProductData, setEditedProductData] = useState({
        productName: '',
        productPrice: 0,
        productDescription: ''
    });
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${fileId}`);
                const data = response.data;
                setProductData(data);
            } catch (error) {
                console.log("오류발생", error);
            }
        };
        fetchProductDetail();
    }, [fileId]);


    // useEffect(() => {

    //     const admin = async () => {//관리자
    //         try {

    //             const response = await axios.get('http://localhost:8080/users');

    //             // 사용자 정보에서 관리자 여부를 확인
    //             const userData = response.data.memberDTO;
    //             const isAdmin = userData.isAdmin;

    //             // 관리자 여부를 설정
    //             setIsAdmin(isAdmin);
    //         } catch (error) {
    //             console.error('사용자 정보를 가져오는 도중 오류가 발생했습니다:', error);
    //         }
    //     };

    //     // useEffect 내에서 사용자 정보를 가져오는 함수 호출
    //     admin();
    // }, []);






    const deleteProduct = async () => {//상품삭제
        try {
            await axios.delete(`http://localhost:8080/product/delete/${id}`);
            navigate('/');
        } catch (error) {
            console.log("상품 삭제 오류", error);
        }
    }

    const editProduct = () => { // 수정 모드로 전환
        setIsEditMode(true);
        setEditedProductData({
            productName: productData.productName,
            productPrice: productData.productPrice,
            productDescription: productData.productDescription
        });
    };

    const editChanges = () => { // 수정 저장

        setProductData({
            ...productData,
            productName: editedProductData.productName,
            productPrice: editedProductData.productPrice,
            productDescription: editedProductData.productDescription
        });
        setIsEditMode(false); // 수정 모드 종료
    };



    const closeEdit = () => {
        setIsEditMode(false);
    };


    const handleCloseModal = () => {
        closeModal(); // 부모 컴포넌트에서 전달된 closeModal 함수 호출

    };



    // const updateProductViews = async () => {
    //     try {
    //         await axios.get('/product/views', {
    //             params: { productId: productId }
    //         });
    //     } catch (error) {
    //         console.log("오류발생", error);
    //     }
    // };

    // useEffect(() => {
    //     updateProductViews();
    // }, [productId]);

    // const handleReviewChange = (event) => {
    //     setReviewText(event.target.value);
    // };

    const handleSatisfactionChange = (event) => { // 만족도 변경 처리
        setSatisfaction(event.target.value);
    };

    const submitReview = () => {
        const newReview = {
            username: "사용자", // 리뷰 작성자
            reviewText: reviewText,
            satisfaction: satisfaction // 만족도 추가
        };

        setReviews([...reviews, newReview]);
        setReviewText(""); // 리뷰 작성 후 폼 초기화
        setSatisfaction(""); // 만족도 초기화
    };

    const handlePurchase = () => {
        const isConfirmed = window.confirm(`"${productData.productName}" 상품을 구매하시겠습니까?.`);
        if (isConfirmed) {
            console.log(`상품(${fileId}) 결제페이지로 이동합니다.`);
            setPurchaseModalOpen(true); // 모달을 열도록 상태 업데이트
        } else {
            console.log(`상품(${fileId}) 구매가 취소되었습니다.`);
        }
    };

    const handleClosePurchaseModal = () => {
        setPurchaseModalOpen(false); // 모달을 닫도록 상태 업데이트
    };

    const addToCart = async () => {

        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingCartItem = existingCartItems.find(item => item.productId === productData.fileId);

        if (existingCartItem) {
            existingCartItem.quantity++; // 이미 장바구니에 있는 상품이라면 수량을 증가시킴
        } else {
            existingCartItems.push({ ...productData, quantity: 1 }); // 새로운 상품이라면 수량을 1로 설정하여 추가
        }

        localStorage.setItem('cart', JSON.stringify(existingCartItems));
        window.alert(`${productData.productName} 상품이 장바구니에 추가되었습니다.`);

    };


    return (
        <div className='all'>
            <div className="modalCloseBtn" onClick={handleCloseModal}>
                닫기
            </div>
            {/* {isAdmin && (
                <div>
                    {isEditMode ? (
                        <>
                            <button onClick={editChanges}>저장</button>
                            <button onClick={closeEdit}>취소</button>
                        </>
                    ) : (
                        <>
                            <button onClick={editProduct}>제품 수정</button>
                            <button onClick={deleteProduct}>삭제</button>
                        </>
                    )}
                </div>

            )} */}
            <div className='product'>

                <div className='productImg'>
                    <img src={`${productData.productURL}`} alt={productData.productName} style={{ width: 330, height: 440 }} />
                    <p className='description'>{/* 상품 이미지 밑 설명글 */}
                        <span className='descripText'>
                            {isEditMode ? (
                                <textarea
                                    value={editedProductData.productDescription}
                                    onChange={(e) => setEditedProductData({ ...editedProductData, productDescription: e.target.value })}
                                    placeholder={productData.productName}
                                />
                            ) : (
                                productData.productDescription
                            )}
                        </span>
                    </p>

                </div>

                <div className='productInfo'>
                    <div className='productInfo1'>
                        <div className='productInfo2'>
                            <div className='productName'>
                                {isEditMode ? (
                                    <input
                                        value={editedProductData.productName}
                                        onChange={(e) => setEditedProductData({ ...editedProductData, productName: e.target.value })}
                                        placeholder={productData.productName}
                                    />
                                ) : (
                                    productData.productName
                                )}
                            </div>
                            <div className='rate'>
                                <div className='rate_start' >
                                    <div className='rate_num'>4.9</div>
                                </div>
                            </div>
                        </div>
                        <div className='stock_deliver'>
                            <div className='stock'>
                                {/*<Shop className="icon-instance-node" />*/}
                                <div className="stock_txt">재고있음</div>

                                <div className='delivery'>
                                    {/* <Truck className="icon-instance-node" />*/}
                                    <div className="delivery_txt">무료배송</div>
                                </div>
                            </div>
                        </div>

                        <div className='infoDetails'>
                            <div className='info'>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>분류</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{isEditMode ? (
                                            <textarea
                                                value={editedProductData.category}
                                                onChange={(e) => setEditedProductData({ ...editedProductData, category: e.target.value })}
                                                placeholder={productData.category}
                                            />
                                        ) : (
                                            productData.category)}
                                        </div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>재고수량</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{isEditMode ? (
                                            <textarea
                                                value={editedProductData.productInven}
                                                onChange={(e) => setEditedProductData({ ...editedProductData, productInven: e.target.value })}
                                                placeholder={productData.productInven}
                                            />
                                        ) : (
                                            productData.productInven)}개
                                        </div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>상품 조회수</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{productData.productView}회</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>업로드 시간</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{productData.uploadTime}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='buy'>

                    <div className='priceSection'>
                        <div className='price'>
                            <div className='currentPrice'> {productData.productPrice} 원</div>
                            <div className='discount'>
                                {/* <div className='discountAmount'>-12%</div>할인율 */}
                            </div>
                        </div>
                        <div className='lastPrice'>
                            {/* <div className='lastPriceTxt'>할인 전 가격</div>
                            <div className='lastPriceTxt'>$456</div> */}
                        </div>
                    </div>

                    {/* 구매 버튼과 모달 컴포넌트 */}
                    <div className='productBtn'>
                        <Button size="sm" className="handlePurchase" onClick={handlePurchase}>구매</Button>
                        {purchaseModalOpen && (
                            <Purchase
                                productName={productData.productName}
                                fileId={fileId}
                                productPrice={productData.productPrice}
                                onClose={handleClosePurchaseModal}
                            />
                        )}
                        <Button size="sm" onClick={addToCart}>장바구니</Button>
                    </div>
                </div>
            </div>
            <div className="reviewArea">
                <h2>상품 리뷰</h2>

                <div className="reviewForm">
                    <input
                        value={reviewText}
                        onChange={submitReview}
                        placeholder="리뷰를 작성해주세요."
                    />
                    <select value={satisfaction} onChange={handleSatisfactionChange}>
                        <option value="">만족도를 선택하세요</option>
                        <option value="very-satisfied">매우 만족</option>
                        <option value="satisfied">만족</option>
                        <option value="neutral">보통</option>
                        <option value="unsatisfied">불만족</option>
                        <option value="very-unsatisfied">매우 불만족</option>
                    </select>
                    <Button size="sm" onClick={submitReview}>리뷰작성</Button>
                </div>
                <div className="reviewList">
                    {reviews.map((review, index) => (
                        <div key={index} className="reviewItem">
                            <strong>{review.username}:</strong> {review.reviewText} (만족도: {review.satisfaction})
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

