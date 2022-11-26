import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataListInputField from '../../../../components/shared/components/DataListInputField';
import TextInputField from '../../../../components/shared/components/TextInputField';
import { CREATE_BATCH_MUTATION } from '../../../../gql/mutations/batchMutation';
import { GET_ALL_ACTIVE_BATCHES, GET_BATCHES_BY_USER_REF, GET_OPEN_BATCH_BY_USER_REF } from '../../../../gql/queries/batchQueries';


const CreateBatchForm = () => {
    // router
    const { id } = useParams();

    // gql
    const batchResponse = useQuery(GET_BATCHES_BY_USER_REF, {
        variables: { id: id }
    });
    const [createBatchMutation, { data, loading, error }] = useMutation(CREATE_BATCH_MUTATION, {
        refetchQueries: [GET_BATCHES_BY_USER_REF, GET_OPEN_BATCH_BY_USER_REF, GET_ALL_ACTIVE_BATCHES],
    });

    // state
    const [batch, setBatch] = useState({
        userId: id,
        batchNo: '',
        description: '',
        previousAmount: '',
    })

    // handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBatch({ ...batch, [name]: value })
    }

    useEffect(() => {
        // showing error message
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }, [error])

    // create batch
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userId, batchNo, description, previousAmount } = batch;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createBatchMutation({
                        variables: {
                            info: {
                                userId,
                                batchNo,
                                description,
                                previousAmount: Number(previousAmount),
                            }
                        }
                    })
                }
            })
    }

    return (
        <>
            <div className="w-full">
                <div className="w-6/12 mx-auto">
                    <h3 className="text-2xl uppercase text-secondary font-bold mb-3 mt-10">Create Batch</h3>

                    <form onSubmit={handleSubmit}>
                        <TextInputField
                            onChange={handleChange}
                            value={batch.userId}
                            label="User Id"
                            name="userId"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <DataListInputField
                            onChange={handleChange}
                            label="Batch No."
                            name="batchNo"
                            type="text"
                            placeholder="Batch No."
                            className="input-sm sm:input-md"
                            dataListId='batchNo'
                            dataList={
                                batchResponse?.data?.getBatchesByUserRef?.map((batch: any) => {
                                    return {
                                        value: batch?.batchNo,
                                        name: batch?._id
                                    }
                                })
                            }
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Description"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Advance Balance"
                            name="previousAmount"
                            type="number"
                            placeholder="Advance Balance"
                            className="input-sm sm:input-md"
                        />
                        {/* <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <SelectInput
                                // onChange={handleSelectChange}
                                label="Unit Type"
                                name="unit"
                                options="kg litre pcs bag"
                                className="select-sm sm:select-md"
                            />
                            <SelectInput
                                // onChange={handleSelectChange}
                                label="Stock Status"
                                name="status"
                                options="in-stock out-of-stock discontinued"
                                className="select-sm sm:select-md"
                            />
                        </div> */}
                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateBatchForm;