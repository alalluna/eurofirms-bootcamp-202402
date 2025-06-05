function block(millis) {
    const before = Date.now()

    while (Date.now() - before < millis);
}

export default block