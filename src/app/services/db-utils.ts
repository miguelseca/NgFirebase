export function convertSnaps<T>(results) {
  return <T[]>results.docs.map((snap) => {

    console.log(snap.id);
    return {
      id: snap.id,
      ...(<any>snap.data()),
    };
  });
}
