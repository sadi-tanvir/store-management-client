import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { MinusIconCart, PlusIconCart } from '../shared/icons/icons'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_STOCK_QUANTITY_MUTATION } from '../../gql/mutations/stockMutation'
import { GET_STOCKS } from '../../gql/queries/stockQueries'


export type CartType = {
    stockId: string,
    name: string,
    category: string,
    brand: string,
    imageUrl: string,
    price: number,
    qty: number,
    unit: string
}

export default function Cart() {
    // redux
    const dispatch = useAppDispatch()
    const { cartState } = useAppSelector(state => state.globalReducer);
    const { cart } = useAppSelector(state => state.cartReducer);
    const [open, setOpen] = useState(cartState)

    // gql
    const [updateStockQuantityMutation, { data, loading, error }] = useMutation(UPDATE_STOCK_QUANTITY_MUTATION, {
        refetchQueries: [GET_STOCKS],
    });
    const stockResponse = useQuery(GET_STOCKS);



    // state
    const [subTotal, setSubTotal] = useState(0)

    // close modal
    const handleCloseModal = () => {
        setOpen(false)
        dispatch({ type: 'setCart' })
    }

    // handle remove item from cart
    const handleRemoveItem = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch({ type: 'removeItemFromCart', payload: { stockId: id } })
                }
            })
    }



    // handle increase cart item quantity
    const handleIncreaseCartItemQty = (cart: CartType) => {
        const currStock = stockResponse?.data?.stocks.filter((stock: any) => {
            return stock._id === cart.stockId
        })
        if (currStock[0].quantity <= 0) {
            return;
        } else {
            dispatch({ type: 'addToCart', payload: cart })
            updateStockQuantityMutation({ variables: { id: cart.stockId, info: { reference: 'decrease' } } })
        }
    }

    // handle decrease cart item quantity
    const handleDecreaseCartItemQty = (id: string) => {
        let newCart: any = cart


        if (newCart[id].qty <= 1) {
            Swal.fire({ title: 'Are you sure?', text: "It will be deleted!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
                .then((result) => {
                    if (result.isConfirmed) {
                        dispatch({ type: 'removeFromCart', payload: { stockId: id } })

                        // update stock quantity
                        updateStockQuantityMutation({ variables: { id: id, info: { reference: 'increase' } } })
                    }
                })
        } else {
            dispatch({ type: 'removeFromCart', payload: { stockId: id } })
            // update stock quantity
            updateStockQuantityMutation({ variables: { id: id, info: { reference: 'increase' } } })
        }


    }


    useEffect(() => {
        // cart state
        setOpen(cartState)

        // calculate total cart price
        const priceList = Object.values(cart).map((item: any) => {
            return item.price * item.qty
        })
        setSubTotal(() => {
            return priceList.reduce((pre, curr) => pre + curr, 0)
        })
    }, [cartState, cart])
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[50]" onClose={() => {
                setOpen(false)


            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={handleCloseModal}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {
                                                            Object.values(cart).map((cart: any) => (
                                                                <li key={cart.stockId} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={cart.imageUrl}
                                                                            alt={cart.name}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href="#">{cart.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4"></p>
                                                                            </div>
                                                                            {/* <p className="mt-1 text-sm text-gray-500">category: {cart.category}</p> */}
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <span className={`bg-teal-200 text-teal-600 font-semibold py-[5px] px-1 rounded text-xs`}>
                                                                                    {cart.price.length > 15 ? `${cart.price.substring(0, 15)}..` : cart.price} BDT
                                                                                </span>
                                                                                <div>
                                                                                    <div className="flex justify-center my-auto ml-auto items-center">
                                                                                        <button onClick={() => handleDecreaseCartItemQty(cart.stockId)} className="">
                                                                                            <MinusIconCart iconClass="w-7 h-7 text-accent style_btn" />
                                                                                        </button>
                                                                                        <p className="text-white px-3 font-bold rounded bg-secondary">{cart.qty}</p>
                                                                                        <button onClick={() => handleIncreaseCartItemQty(cart)} className="">
                                                                                            <PlusIconCart iconClass="w-7 h-7 text-primary style_btn" />
                                                                                        </button>
                                                                                        {/* {qty < 10 ? `0${qty}` : qty} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Qty {cart.qty}</p>

                                                                            <div className="flex">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>{subTotal.toFixed(2)} BDT</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <a
                                                    href="#"
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </a>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                {/* <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
